import localFont from 'next/font/local';
import { Roboto } from 'next/font/google'

export const GeistMonoFont = localFont({
  src: [
    {
      path: '/app/fonts/GeistMonoVF.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/app/fonts/GeistVF.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const RobotoFont = Roboto({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-roboto',
	display: 'swap',
})

export const GothicFont = localFont({
	src: [
		{
			path: "/app/fonts/goth_font.otf",
			style: 'normal',
		}],
	variable: "--font-gothic",
	display: 'swap',
});

export const YouTubeSansFont = localFont({
  src: [
    { path: '/app/fonts/YouTubeSansLight.otf', weight: '400', style: 'normal' },
    { path: '/app/fonts/YouTubeSansMedium.otf', weight: '500', style: 'normal' },
    { path: '/app/fonts/YouTubeSansSemibold.otf', weight: '600', style: 'normal' },
    { path: '/app/fonts/YouTubeSansBold.otf', weight: '700', style: 'normal' },
    { path: '/app/fonts/YouTubeSansExtrabold.otf', weight: '800', style: 'normal' },
    { path: '/app/fonts/YouTubeSansBlack.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-yt-sans',
  display: 'swap',
});

export const YouTubeSansDarkFont = localFont({
	src: [
		{ path: '/app/fonts/YouTubeSansDarkRegular.otf', weight: '400', style: 'normal' },
		{ path: '/app/fonts/YouTubeSansDarkMedium.otf', weight: '500', style: 'normal' },
		{ path: '/app/fonts/YouTubeSansDarkSemibold.otf', weight: '600', style: 'normal' },
		{ path: '/app/fonts/YouTubeSansDarkBold.otf', weight: '700', style: 'normal' },
		{ path: '/app/fonts/YouTubeSansDarkExtrabold.otf', weight: '800', style: 'normal' },
		{ path: '/app/fonts/YouTubeSansDarkBlack.otf', weight: '900', style: 'normal' },
	],
	variable: '--font-yt-sans-dark',
	display: 'swap',
});
