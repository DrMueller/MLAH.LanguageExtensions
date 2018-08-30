function buildLibrary([String] $libraryName) {
  Write-Host 'Building' $libraryName
  npm run ng build --prod $libraryName # https://github.com/angular/angular-cli/issues/5955
  Write-Host 'Builded' $libraryName
}
function packLibrary([String] $libraryName) {
  # Navigate to the dist Path
  $originalPath = $PSScriptRoot
  $distPath = getDistPathForLibrary($libraryName)
  $rootPath = (get-item $originalPath).parent.FullName

  $relativeDistPath = $rootPath + "/" + $distPath
  Set-Location $relativeDistPath

  # Clear TGZ files
  Write-Host 'Removing old TGZ files'
  Remove-Item *.tgz

  # Pack the Library
  Write-Host 'Packing' $libraryName
  npm pack
  Write-Host 'Packed' $libraryName

  # Copy to publish
  $publishPath = $rootPath + "\publish\"
  Write-Host 'Publishing to' $publishPath
  createOrClearDirectory($publishPath)
  
  [array] $tgzFiles = Get-ChildItem -File *.tgz
  Write-Host 'Found tgz' $tgzFiles.Count

  $tgzFiles | ForEach-Object { copy-item -Path $_ -Destination  $publishPath -Force -Container }

  # get the Targz and publish it
  # $targzFile = Get-ChildItem -File *.tgz
  # npm publish $targzFile --access public

  # Back to the original Path
  Set-Location $originalPath
}

function createOrClearDirectory([string] $directoryPath) {
  If(!(test-path $directoryPath))
  {
    New-Item -ItemType Directory -Force -publishPath $directoryPath
  }
  else
  {
    Remove-Item $directoryPath | Where-Object { ! $_.PSIsContainer }
  }
}

# ------------ Core Start
function getModuleFile([string]$fileName, [string]$subPath = "Common") {
  $filePath = $PSScriptRoot
  $filePath = Split-Path -Path $filePath -Parent
  $fileName = $($filePath + "/" + $subPath + "/" + $fileName + ".psm1")
  return $fileName
}
function loadModules() {
  Import-Module $($PSScriptRoot + "/Utils.psm1") -Force -Verbose
}
# ------------ Core End

loadModules

$libraryNames = getLibraryNames

foreach ($libraryName in $libraryNames) {
  buildLibrary($libraryName)
  packLibrary($libraryName)
}
