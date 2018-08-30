function buildLibrary([String] $libraryName) {
  Write-Host 'Building' $libraryName
  npm run ng build --prod $libraryName # https://github.com/angular/angular-cli/issues/5955
}
function packLibrary([String] $libraryName) {
  # Navigate to the dist Path
  $originalPath = $PSScriptRoot
  $distPath = getDistPathForLibrary($libraryName)
  $rootPath = (get-item $originalPath).parent.FullName
  $publishPath = $rootPath + "\publish\"
  $relativeDistPath = $rootPath + "\" + $distPath

  Set-Location $relativeDistPath

  # Clear TGZ files
  Write-Host 'Removing old TGZ files'
  Remove-Item *.tgz

  # Pack the Library
  Write-Host 'Packing' $libraryName
  npm pack

  # Set up publish folder
  createOrClearDirectory($publishPath)
  
  # Get the tgz
  $tgzFile = Get-ChildItem -File *.tgz | Select-Object -first 1
  
  # Rename the tgz
  $tgzFile = Rename-Item -Path $tgzFile -NewName "export.tgz" -PassThru

  # Copy the tgz to the publish folder
  Copy-Item -Path $tgzFile -Destination $publishPath -Force -Container
  
  # Back to the original Path
  Set-Location $originalPath
}

function createOrClearDirectory([string] $directoryPath) {
  If(!(test-path $directoryPath))
  {
    New-Item -ItemType Directory -Force -Path $directoryPath
  }
  else
  {
    Get-ChildItem -Path $directoryPath -Force -Recurse | Remove-Item -Recurse -Force
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
