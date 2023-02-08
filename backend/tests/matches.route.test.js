test('has routes', () => {
  const routes = [
    { path: '/full/:id', method: 'get' },
    { path: '/:block/:league', method: 'get' },
  ]

  it.each(routes)('`$method` exists on $path', (route) => {
    expect(router.stack.some((s) => Object.keys(s.route.methods).includes(route.method))).toBe(true)
    expect(router.stack.some((s) => s.route.path === route.path)).toBe(true)
  })
})
