import * as React from 'react'
import type { NextPage } from 'next'
import Router from 'next/router'

const Home: NextPage = () => {
  React.useEffect(() => {
    Router.replace('/home')
  })
  return null
}

export default Home
