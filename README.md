# Bothered

시스템 종료 기능이 포함된 Next.js 웹 애플리케이션입니다.

## 📋 프로젝트 소개

Bothered는 웹 인터페이스를 통해 macOS 시스템을 원격으로 제어할 수 있는 애플리케이션입니다. 주요 기능으로는 실행 중인 애플리케이션들을 종료하고 시스템을 안전하게 종료하는 기능이 있습니다.

### 주요 기술 스택

- **Next.js 15.4.5** - React 기반 풀스택 프레임워크
- **React 19.1.0** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성을 위한 언어
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크

## 🚀 실행 방법

### 사전 요구사항

- Node.js 18.0.0 이상
- pnpm (권장) 또는 npm

### 설치 및 실행

1. **의존성 설치**

   ```bash
   pnpm install
   ```

2. **개발 서버 실행**

   ```bash
   pnpm dev
   ```

   개발 서버는 http://localhost:3000 에서 실행됩니다.

   > **참고**: 개발 환경에서는 시스템이 종료되지 않습니다. 이는 Next.js 개발 서버가 Hot Module Replacement(HMR)를 위해 파일 변경을 감시하고 있어서, 시스템 종료 명령이 실행되기 전에 서버가 먼저 종료되기 때문입니다.

3. **프로덕션 빌드**

   ```bash
   pnpm build
   ```

4. **프로덕션 서버 실행**

   ```bash
   pnpm start
   ```

   프로덕션 서버는 http://localhost:3333 에서 실행됩니다.

5. **코드 린팅**
   ```bash
   pnpm lint
   ```

## 🔧 PM2로 프로덕션 배포

PM2를 사용하면 애플리케이션을 데몬으로 실행하고 프로세스를 관리할 수 있습니다.

### 1. PM2 설치

```bash
# 전역 설치
npm install -g pm2

# 또는 pnpm 사용
pnpm add -g pm2
```

### 2. PM2로 애플리케이션 실행

```bash
# 1. 프로덕션 빌드
pnpm build

# 2. PM2로 시작
pm2 start npm --name "my-next-app" -- start

# 3. PM2 프로세스 확인
pm2 list

# 4. 로그 확인
pm2 logs bothered

# 5. 시스템 부팅 시 자동 시작 설정
pm2 startup
# 출력된 안내 명령 복사 실행
pm2 save
```

### 4. PM2 주요 명령어

```bash
# 애플리케이션 중지
pm2 stop bothered

# 애플리케이션 재시작
pm2 restart bothered

# 애플리케이션 삭제
pm2 delete bothered

# 모든 프로세스 중지
pm2 stop all

# PM2 모니터링
pm2 monit
```

## 🛡️ 보안 주의사항

이 애플리케이션은 시스템 종료 기능을 포함하고 있습니다. 프로덕션 환경에서 사용할 때는 다음 사항을 고려하세요:

- 적절한 인증 및 권한 검증 추가
- HTTPS 사용 권장
- 방화벽 설정으로 접근 제한
- API 엔드포인트에 대한 보안 강화

## 📝 라이선스

MIT License
