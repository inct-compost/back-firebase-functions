# <div style="text-align: center;">back-firebase-functions</div>
<!-- <p align="center">
  <img src="/static/icon.png"  width="256" height="256" alt="nuxt-firebase logo">
</p>
 -->
## Description
ハードウェアとFirebaseとの橋渡しを担うFirebase-functionsプロジェクト<br>
カスタムトークンの生成やFirestoreへのデータ追加プログラム

## Dependencies / DevDependencies
| name | version |
| ------------- | ------------- |
| firebase-admin | ^9.8.0 |
| firebase-functions | ^3.14.1 |
| devDependencies |
| eslint | ^7.6.0 |
| firebase-functions-test | ^0.2.0 |
| typescript | ^4.8.4 |

## Getting Started
### 0. Add secret key
1. Acess to `Firebase console > serviceaccounts`
2. Click "Generate new private key"
3. Save as `src > admin-sdk-token.key.json`

### 1. Install
```powershell
yarn
```

### 2. Run test server
```powershell
yarn dev
```

Acsess to [localhost:5001/research2022-5j/us-central1/[api-name]](http://localhost:5001/research2022-5j/us-central1/[api-name])

### 3. Build and deploy
```powershell
yarn build
```

```powershell
yarn deploy
```

## How to use
### Send test request
I use [postman desktop](https://www.postman.com/downloads/)
