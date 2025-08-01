import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (!action || (action !== 'up' && action !== 'down')) {
      return NextResponse.json(
        { error: "Invalid action. Use 'up' or 'down'" },
        { status: 400 }
      );
    }

    // macOS에서 볼륨 조절을 위한 osascript 명령어
    const command =
      action === 'up'
        ? 'osascript -e "set volume output volume (output volume of (get volume settings) + 10)"'
        : 'osascript -e "set volume output volume (output volume of (get volume settings) - 10)"';

    await execAsync(command);

    // 현재 볼륨 상태 가져오기
    const { stdout: volumeOutput } = await execAsync(
      'osascript -e "output volume of (get volume settings)"'
    );

    const currentVolume = parseInt(volumeOutput.trim());

    return NextResponse.json({
      success: true,
      action,
      currentVolume,
    });
  } catch (error) {
    console.error('Error controlling system volume:', error);
    return NextResponse.json(
      { error: 'Failed to control system volume' },
      { status: 500 }
    );
  }
}
