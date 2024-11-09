export const pageLinks = {
  login: '/auth/signin',
  signup: '/auth/signup',
  myPages: '/app/pages',
  editPage: (id?: string) => `/app/pages/${id}/edit`,
  newPage: '/app/pages/new',
  feed: '/',
  notFound: '/404',
  shortLinkPage: (shortId?: string) => `/p/${shortId}`,
}