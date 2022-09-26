# create-next-app

create-next-app 타입스크립트 적용

```
> npx create-next-app <폴더명> --typescript
```

# prisma

database ORM 이다.

1. VSCODE `prisma` 확장프로그램 설치

2. `prisma` 패키지 설치

```
> npm i prisma -D
> npx prisma init
```

`/prisma/schema.prisma` 파일이 자동으로 생성

`.env` 파일이 생성됨

`.gitignore` 파일에 `.env`를 추가

```
// .gitignore

.env
```

3. prisma 초기설정

```
// .env

DATABASE_URL=<내 데이터베이스주소>

```

prisma/schema.prisma 파일 설정

```
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  // postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb
  provider = "mongodb"      // 사용할 데이터베이스 지정
  url      = env("DATABASE_URL")
}

model User{
    ...
}

```

4. 데이터베이스에 스키마 업로드

```
> npx prisma db push
```

5. prisma studio 실행 (데이터베이스 웹 클라이언트)

이 명령어가 실행중에만 접속할 수 있음

```
>npx prisma studio
```

6. `prisma` client 설정

```
> npx prisma generate
```
