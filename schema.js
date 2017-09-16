const {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} = require("graphql");

const data = require("./data.js");

const Author = new GraphQLObjectType({
    name: "Author",
    description: "Author of article",
    fields: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString, description: "Name of author"},
        company: {type: GraphQLString},
    }
});

const Post = new GraphQLObjectType({
    name: "Post",
    description: "Articles in the blog",
    fields: {
        id: {type: GraphQLInt},
        author: {
            type: Author,
            resolve: (subTree) => {
                const author = subTree.author.split("/")[1];
                return data.getAuthor(author);
            }
        },
        categories: {type: new GraphQLList(GraphQLString)},
        publishDate: {type: GraphQLString},
        summary: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        title: {type: GraphQLString}
    }
});

const Blog = new GraphQLObjectType({
    name: "Blog",
    description: "A website of fantastic content",
    fields: {
        posts: {
            type: new GraphQLList(Post),
            resolve: () => data.getPosts()
        }
    }
});

module.exports = new GraphQLSchema({
    query: Blog
});
