#!/usr/bin/env bash
# Switches the example between the published Swift package (default) and a
# local sdk-ios checkout, same convention as example-android's
# SCREEB_USE_LOCAL_SDK gradle property:
#
#   SCREEB_USE_LOCAL_SDK=true ./use-sdk.sh   # local ../../../screeb/sdk-ios (or $SCREEB_IOS_SDK_PATH)
#   ./use-sdk.sh                             # back to the published package
#
# Idempotent; rewrites only the package-reference block of the pbxproj (the
# reference id is shared by both forms, so nothing else moves).
set -euo pipefail
cd "$(dirname "$0")"

MODE="remote"
[[ "${SCREEB_USE_LOCAL_SDK:-}" == "true" ]] && MODE="local"

python3 - "$MODE" "${SCREEB_IOS_SDK_PATH:-../../../screeb/sdk-ios}" <<'PYEOF'
import os, re, sys

mode, sdk_path = sys.argv[1], sys.argv[2]
local_path = os.path.relpath(sdk_path) if os.path.isabs(sdk_path) else sdk_path
path = "ScreebExample.xcodeproj/project.pbxproj"
content = open(path).read()

ref_id = "B40000012E00000000000001"
remote_comment = f'{ref_id} /* XCRemoteSwiftPackageReference "sdk-ios-public" */'
remote_block = f"""\t\t{remote_comment} = {{
\t\t\tisa = XCRemoteSwiftPackageReference;
\t\t\trepositoryURL = "https://github.com/ScreebApp/sdk-ios-public";
\t\t\trequirement = {{
\t\t\t\tkind = upToNextMajorVersion;
\t\t\t\tminimumVersion = 4.4.0;
\t\t\t}};
\t\t}};"""
local_comment = f'{ref_id} /* XCLocalSwiftPackageReference "{local_path}" */'
local_block = f"""\t\t{local_comment} = {{
\t\t\tisa = XCLocalSwiftPackageReference;
\t\t\trelativePath = "{local_path}";
\t\t}};"""

block_re = re.compile(rf"\t\t{ref_id} /\* XC(?:Remote|Local)SwiftPackageReference [^*]*\*/ = \{{.*?\n\t\t\}};", re.S)
comment_re = re.compile(rf'{ref_id} /\* XC(?:Remote|Local)SwiftPackageReference "[^"]*" \*/')
assert block_re.search(content), "package reference block not found: pbxproj drifted?"

block, comment = (local_block, local_comment) if mode == "local" else (remote_block, remote_comment)
# Keep every reference comment in sync: a lying comment defeats any grep audit of the current mode.
content = comment_re.sub(comment, block_re.sub(lambda _: block, content))
open(path, "w").write(content)
print(f"now using {'the LOCAL ' + local_path if mode == 'local' else 'the PUBLISHED sdk-ios-public package'}")
PYEOF
