import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;
let timeInterval: NodeJS.Timeout | undefined;

function log(level: string, message: string) {
    const config = vscode.workspace.getConfiguration('vibe-coder');
    const logLevel = config.get<string>('logLevel', 'info');
    
    if (logLevel === 'off') return;
    if (logLevel === 'info' && level === 'debug') return;
    
    console.log(`[Vibe Coder] ${message}`);
}

async function applyTheme(themeLabel: string, triggerType: string) {
    const currentTheme = vscode.workspace.getConfiguration().get('workbench.colorTheme');
    
    if (currentTheme !== themeLabel) {
        try {
            log('info', `Applying theme: ${themeLabel} (Trigger: ${triggerType})`);
            await vscode.workspace.getConfiguration().update('workbench.colorTheme', themeLabel, true);
            statusBarItem.text = themeLabel;
            statusBarItem.tooltip = `Vibe Coder: ${themeLabel} (${triggerType})`;
            statusBarItem.show();
        } catch (error) {
            log('debug', `Error applying theme: ${error}`);
        }
    } else {
        log('debug', `Theme ${themeLabel} already active`);
        statusBarItem.text = themeLabel;
        statusBarItem.tooltip = `Vibe Coder: ${themeLabel} (${triggerType})`;
        statusBarItem.show();
    }
}

function getTimeBasedThemeLabel(): string {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) {
        return 'Vibe: Morning Calm';
    } else if (hour >= 12 && hour < 18) {
        return 'Vibe: Afternoon Focus';
    } else {
        return 'Vibe: Night Owl';
    }
}

function getLanguageBasedThemeLabel(languageId: string | undefined): string | null {
    if (!languageId) return null;
    
    switch (languageId.toLowerCase()) {
        case 'python':
            return 'Vibe: Python Zen';
        case 'javascript':
        case 'typescript':
        case 'html':
        case 'css':
            return 'Vibe: WebDev Flow';
        default:
            return null;
    }
}

function checkTriggersAndApplyTheme() {
    const config = vscode.workspace.getConfiguration('vibe-coder');
    const enableLanguageTrigger = config.get<boolean>('enableLanguageTrigger', true);
    const enableTimeTrigger = config.get<boolean>('enableTimeTrigger', true);
    
    const activeEditor = vscode.window.activeTextEditor;
    const languageId = activeEditor?.document.languageId;
    
    // Priority: Language first, then time
    if (enableLanguageTrigger) {
        const languageTheme = getLanguageBasedThemeLabel(languageId);
        if (languageTheme) {
            applyTheme(languageTheme, 'Language');
            return;
        }
    }
    
    if (enableTimeTrigger) {
        const timeTheme = getTimeBasedThemeLabel();
        applyTheme(timeTheme, 'Time');
        return;
    }
    
    // Fallback to default dark theme
    applyTheme('Vibe: Default Dark', 'Fallback');
}

export function activate(context: vscode.ExtensionContext) {
    log('info', 'Vibe Coder is now active');
    
    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusBarItem);
    
    // Register editor change listener
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(() => {
            checkTriggersAndApplyTheme();
        })
    );
    
    // Register configuration change listener
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('vibe-coder')) {
                const config = vscode.workspace.getConfiguration('vibe-coder');
                const updateInterval = config.get<number>('updateIntervalMinutes', 5);
                const enableTimeTrigger = config.get<boolean>('enableTimeTrigger', true);
                
                // Clear existing interval if any
                if (timeInterval) {
                    clearInterval(timeInterval);
                    timeInterval = undefined;
                }
                
                // Set up new interval if time trigger is enabled
                if (enableTimeTrigger) {
                    timeInterval = setInterval(checkTriggersAndApplyTheme, updateInterval * 60 * 1000);
                }
                
                checkTriggersAndApplyTheme();
            }
        })
    );
    
    // Initial setup
    const config = vscode.workspace.getConfiguration('vibe-coder');
    const updateInterval = config.get<number>('updateIntervalMinutes', 5);
    const enableTimeTrigger = config.get<boolean>('enableTimeTrigger', true);
    
    if (enableTimeTrigger) {
        timeInterval = setInterval(checkTriggersAndApplyTheme, updateInterval * 60 * 1000);
    }
    
    // Initial theme application
    checkTriggersAndApplyTheme();
}

export function deactivate() {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    log('info', 'Vibe Coder is now deactivated');
} 