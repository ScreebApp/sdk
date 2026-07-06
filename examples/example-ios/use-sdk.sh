#!/usr/bin/env bash
# Switches the example between the published Swift package (default) and the
# local ../../../sdk-ios checkout — same convention as example-android's
# SCREEB_USE_LOCAL_SDK gradle property:
#
#   SCREEB_USE_LOCAL_SDK=true ./use-sdk.sh   # build against the local checkout
#   ./use-sdk.sh                             # back to the published package
#
# Idempotent; rewrites only the package-reference block of the pbxproj (the
# reference id is shared by both forms, so nothing else moves).
set -euo pipefail
cd "$(dirname "$0")"

MODE="remote"
[[ "${SCREEB_USE_LOCAL_SDK:-}" == "true" ]] && MODE="local"

python3 - "$MODE" <<'PYEOF'
import sys

mode = sys.argv[1]
path = "ScreebExample.xcodeproj/project.pbxproj"
content = open(path).read()

remote_block = """\t\tB40000012E00000000000001 /* XCRemoteSwiftPackageReference "sdk-ios-public" */ = {
\t\t\tisa = XCRemoteSwiftPackageReference;
\t\t\trepositoryURL = "https://github.com/ScreebApp/sdk-ios-public";
\t\t\trequirement = {
\t\t\t\tkind = upToNextMajorVersion;
\t\t\t\tminimumVersion = 3.2.4;
\t\t\t};
\t\t};"""
local_block = """\t\tB40000012E00000000000001 /* XCLocalSwiftPackageReference "../../../sdk-ios" */ = {
\t\t\tisa = XCLocalSwiftPackageReference;
\t\t\trelativePath = "../../../sdk-ios";
\t\t};"""

if mode == "local":
    if local_block in content:
        print("already using the LOCAL sdk-ios checkout")
        sys.exit(0)
    assert remote_block in content, "remote package block not found — pbxproj drifted?"
    content = content.replace(remote_block, local_block)
    print("now using the LOCAL ../../../sdk-ios checkout")
else:
    if remote_block in content:
        print("already using the published package")
        sys.exit(0)
    assert local_block in content, "local package block not found — pbxproj drifted?"
    content = content.replace(local_block, remote_block)
    print("now using the PUBLISHED sdk-ios-public package")

open(path, "w").write(content)
PYEOF
