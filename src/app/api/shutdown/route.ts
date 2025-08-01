import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command } = body;

    if (command !== 'shutdown_all') {
      return NextResponse.json({ message: 'Unknown command' }, { status: 400 });
    }

    return new Promise<NextResponse>((resolve) => {
      // 더 간단한 AppleScript 방식으로 변경
      // 1단계: 모든 앱 종료 (Finder 제외) - 확인 대화상자 없이 강제 종료
      const quitAppsCommand = `osascript -e 'tell application "System Events"' -e 'set appList to name of every application process whose background only is false' -e 'repeat with appName in appList' -e 'if appName is not "Finder" then' -e 'try' -e 'tell application appName to quit saving no' -e 'end try' -e 'end if' -e 'end repeat' -e 'end tell'`;

      exec(quitAppsCommand, (quitError) => {
        if (quitError) {
          console.log(
            '⚠️  AppleScript로 일부 앱 종료 실패 - 주요 앱들을 강제 종료:',
            quitError.message
          );

          // 대안: 주요 앱들을 개별적으로 강제 종료 (확인 대화상자가 자주 나타나는 앱들)
          const commonApps = [
            'Safari',
            'Google Chrome',
            'Firefox',
            'iTerm2',
            'Terminal',
            'Visual Studio Code',
            'Code',
            'Slack',
            'Discord',
            'Spotify',
            'Notion',
          ];
          commonApps.forEach((app) => {
            exec(`killall "${app}" 2>/dev/null`, () => {}); // 에러 출력 숨기고 무시
          });
        }

        // 2단계: 3초 대기 후 시스템 종료 (AppleScript 사용 - 비밀번호 불필요)
        setTimeout(() => {
          exec(
            'osascript -e "tell application \\"System Events\\" to shut down"',
            (shutdownError) => {
              if (shutdownError) {
                console.error('❌ 시스템 종료 실패:', shutdownError.message);
                resolve(
                  NextResponse.json(
                    {
                      message: 'Shutdown failed',
                      error: shutdownError.message,
                    },
                    { status: 500 }
                  )
                );
              } else {
                resolve(
                  NextResponse.json(
                    { message: 'Shutdown initiated' },
                    { status: 200 }
                  )
                );
              }
            }
          );
        }, 3000);
      });
    });
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }
}
