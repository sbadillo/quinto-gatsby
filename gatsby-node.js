/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const slash = require(`slash`)
// const Promise = require(`bluebird`)

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   // we use the provide allContentfulBlogPost
//   // query to fetch the data from Contentful
//   return graphql(
//     `
//       {
//         allContentfulBlogPost {
//           edges {
//             node {
//               id
//               slug
//             }
//           }
//         }
//       }
//     `
//   ).then(result => {
//     if (result.errors) {
//       console.log("Error retrieving contentful data", result.errors)
//     }

//     // Resolve the paths to our template
//     const blogPostTemplate = path.resolve("./src/templates/blogpost.js")

//     // Then for each result we create a page
//     result.data.allContentfulBlogPost.edges
//       .forEach(edge => {
//         createPage({
//           path: `/blogpost/${edge.node.slug}/`,
//           component: slash(blogPostTemplate),
//           context: {
//             slug: edge.node.slug,
//             id: edge.node.id,
//           },
//         })
//       })
//       .catch(error => {
//         console.log("Error retrieving contenful data", error)
//       })
//   })
// }

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blogpost.js")
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  id
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blogposts/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )
  })
}
