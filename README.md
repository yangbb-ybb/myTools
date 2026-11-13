# Toolbox

一个跨平台的离线桌面工具箱，使用 Electron + React + TypeScript 构建。

## 功能

- URL 转二维码：本地生成并保存 PNG
- URL 编码：支持 URI 与 URI Component 编码/解码
- JSON 格式化：校验、格式化、压缩、复制和保存
- RAR 转 ZIP：通过随应用分发的 7zz 在本地转换（首版不支持密码和分卷）

## 开发

```bash
npm install
npm run dev
```

如果本机没有 Rust，仍可直接开发和预览全部文本工具。RAR 转 ZIP 需要把当前平台的 7zz 放入：

```text
vendor/7zip/mac-arm64/7zz
vendor/7zip/mac-x64/7zz
vendor/7zip/win-x64/7zz.exe
vendor/7zip/win-arm64/7zz.exe
```

请在分发前确认 7zz 的许可证、签名和各目标平台的再分发条款。空的 vendor 目录只用于保留资源结构，项目不会自动下载未审核的二进制文件。

## 构建

```bash
npm run typecheck
npm run build
npm run dist:mac  # 在 macOS runner 上生成 DMG / ZIP
npm run dist:win  # 在 Windows runner 上生成 NSIS / portable
```

构建产物会输出到 `release/` 目录。跨平台发布使用 `.github/workflows/build.yml`，建议在对应的原生 runner 上构建，后续再补充 Windows 签名、Apple Developer 签名和 notarization。
