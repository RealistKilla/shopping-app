import { execSync } from 'child_process';
import * as os from 'os';
import * as path from 'path';

function installMaestro(): void {
  console.log("Checking operating system for Maestro CLI installation...");
  const platform = os.platform();

  try {
    if (platform === 'win32') {
      console.log("🪟 Windows environment detected. Initialising native download pipeline...");

      const installDir = path.join(os.homedir(), '.maestro-win');
      // Reflecting the actual unzipped destination path structure
      const binDir = `${installDir}\\maestro\\bin`; 
      
      const winCmd = `powershell -Command "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue'; Write-Host 'Creating destination folder...'; New-Item -ItemType Directory -Force -Path '${installDir}' | Out-Null; Write-Host 'Downloading Maestro archive from GitHub...'; Invoke-WebRequest -Uri 'https://github.com/mobile-dev-inc/maestro/releases/latest/download/maestro.zip' -OutFile '${installDir}\\maestro.zip' -MaximumRedirection 5; Write-Host 'Extracting binary payloads...'; Expand-Archive -Path '${installDir}\\maestro.zip' -DestinationPath '${installDir}' -Force; Remove-Item -Path '${installDir}\\maestro.zip' -Force; Write-Host 'Updating environment path records...'; $userPath = [Environment]::GetEnvironmentVariable('Path', 'User'); if ($userPath -notlike '*${binDir}*') { [Environment]::SetEnvironmentVariable('Path', \\"$userPath;${binDir}\\", 'User') }"`;

      execSync(winCmd, { stdio: 'inherit' });
      
      console.log("\n✅ Windows Maestro CLI setup completed successfully!");
      console.log(`📍 Installed to: ${binDir}`);
      console.log("⚠️ Please CLOSE and RESTART your terminal application to reload your environment PATH variables.");
    } else {
      console.log("🍎🐧 Unix-based system detected (macOS/Linux). Executing Bash setup...");
      const unixCmd = 'curl -fsSL "https://get.maestro.mobile.dev" | bash';
      
      execSync(unixCmd, { stdio: 'inherit' });
      console.log("\n✅ Unix Maestro CLI setup completed successfully!");
    }
  } catch (error: any) {
    console.error("\n❌ Installation Pipeline Halted! Something went wrong during execution.");
    console.error("Details:", error.message);
    process.exit(1);
  }
}

installMaestro();
