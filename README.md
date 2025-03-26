This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

-> clone the repo
-> install the dependencies: npm install
-> run the development server: npm run dev

Design Decisions :

**Gradient Header**: Implemented for a modern, premium look, enhancing contrast and brand consistency with the logo. It improves readability and adds depth to the design.

**Mobile Drawer**: Chose a drawer for mobile navigation to ensure a clean, space-efficient UI while maintaining accessibility and responsiveness.

**Logo Image Priority**: Utilized Next.js's priority attribute on the logo to optimize loading performance and improve Core Web Vitals by preloading the image and reducing LCP time.

**MockAPI Choice**: Selected MockAPI.io over JSONPlaceholder for its ability to define custom fields, such as author(which is not in jsonPlaceholder), providing greater control over the API response.

**Infinite Scroll**: Initially implemented Pagination , later switched to infinite scroll due to MockAPI.io's lack of total count, which could cause issues with post visibility after creating new posts.


