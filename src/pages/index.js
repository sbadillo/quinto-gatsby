import React from "react"
import LifeGrid from "../components/LifeGrid"

import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi</h1>
    <p>The grid</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <LifeGrid />
    </div>
    <Link to="/blogposts/">View all posts</Link>
  </Layout>
)

export default IndexPage
