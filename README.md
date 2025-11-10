This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# 📝 MyTasks - Görev Yönetim Uygulaması

**MyTasks**, günlük, haftalık ve aylık görevlerini düzenlemeni, takip etmeni ve tamamladıklarını istatistik olarak görüntülemeni sağlayan modern ve sade bir görev yönetim uygulamasıdır.

Görevler **MongoDB veritabanında** saklanır. Uygulama backend API endpoints yapısı ile çalışır.


## 🚀 Özellikler

| Özellik | Açıklama |
|--------|----------|
| ✅ Görev ekleme / silme / düzenleme | Görevler üzerinde tam kontrol |
| 🗂 Görev Gruplama | **Günlük / Haftalık / Aylık** kategorileri |
| 🎯 Görev Tamamlama | İşaretle ve tamamlananlar otomatik kaydedilir |
| 📊 İstatistik & Grafikler | Tamamlanma oranlarını ve günlük sayım grafiğini gör |
| 🪟 Modal Yapısı | Tamamlanan görevleri modal pencerede listeleyebilme |
| 🌙 Modern UI | Tailwind CSS + Custom UI tasarım |
| 🧠 Zustand Store | Global state yönetimi |
| 🗄 MongoDB + API Routes | Veriler kalıcı olarak sunucu tarafında saklanır |

---

## 🛠 Kullanılan Teknolojiler

| Teknoloji / Araç | Kullanım Amacı |
|------------------|----------------|
| **Next.js (App Router)** | UI yapısı ve sayfa yönetimi |
| **TypeScript**|
| **Zustand** | Global state yönetimi |
| **TailwindCSS** | Responsive ve modern UI tasarım |
| **Lucide Icons** | UI ikonları |
| **Recharts** | Veri görselleştirme (Tamamlanma grafiği) |


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
