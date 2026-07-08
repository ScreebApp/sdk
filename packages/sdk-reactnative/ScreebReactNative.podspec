require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "ScreebReactNative"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.0" }
  s.source       = { :git => "https://github.com/ScreebApp/sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,cpp,swift}"
  s.private_header_files = "ios/**/*.h"

  if ENV["SCREEB_USE_LOCAL_SDK"] == "true"
    s.dependency "Screeb"
  else
    s.dependency "Screeb", '~> 4.0.2'
  end
  s.dependency "React-Core"
  install_modules_dependencies(s)
end
