$ErrorActionPreference = "Stop"

$appsDir = Join-Path $PSScriptRoot "..\\apps"
New-Item -ItemType Directory -Force -Path $appsDir | Out-Null

$release = Invoke-RestMethod -Uri "https://api.github.com/repos/saucelabs/my-demo-app-rn/releases/latest"
$apk = $release.assets | Where-Object { $_.name -like "Android-*.apk" } | Select-Object -First 1

if (-not $apk) {
    throw "Could not find an Android APK asset in the latest my-demo-app-rn release."
}

$target = Join-Path $appsDir $apk.name
Invoke-WebRequest -Uri $apk.browser_download_url -OutFile $target
Write-Host "Downloaded $($apk.name) to $target"
