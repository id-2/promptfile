import { transpileGlassTypescript } from '@glass-lang/glassc'
import * as vscode from 'vscode'

export async function transpileCurrentFile(document: vscode.TextDocument) {
  const activeEditorWorkspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri)!
  const outputDirectoryConfig: string = vscode.workspace.getConfiguration('prompt').get('outputDirectory') as any
  const defaultModel: string = vscode.workspace.getConfiguration('prompt').get('defaultModel') as any
  const workspacePath = activeEditorWorkspaceFolder.uri.fsPath
  const outDir = outputDirectoryConfig.replace('${workspaceFolder}', workspacePath)

  const filePath = document.uri.fsPath

  try {
    const code = transpileGlassTypescript(workspacePath, filePath, 'typescript', outDir, defaultModel)
    // isPython
    //   ? await transpileGlassPython(filePath, filePath, 'python', path.join(path.dirname(filePath)))
    //   : transpileGlassTypescript(workspacePath, filePath, 'typescript', outDir)
    return code
  } catch (error) {
    console.error(error)
    throw error
  }
}
