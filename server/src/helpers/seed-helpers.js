const { faker } = require("@faker-js/faker");
const { words, sentences, paragraphs } = faker.lorem;
const { capitalizeEachWord, slugify } = require("./index");

function getRandomUnsplashImage(size = "1920x1080") {
    return `https://source.unsplash.com/random/${size}?sig=` + Math.floor(Math.random() * 1000);
}


// function to generate markdown blog post using faker
function generateMarkdownPost() {
    //  random number between 5 and 13
    const title = capitalizeEachWord(words(Math.floor(Math.random() * 8) + 5));
    const excerpt = sentences(3);
    // const bannerImage = faker.image.imageUrl();
    const bannerImage = "https://source.unsplash.com/random/1920x1080?sig=" + Math.floor(Math.random() * 1000);
    const markdown = `# ${title}
${paragraphs(3)}

${paragraphs(8)}

![${words(3)}](${getRandomUnsplashImage()} align="center")

${paragraphs(2)}

${paragraphs(5)}

![${words(3)}](${getRandomUnsplashImage()} align="center")


${paragraphs(5)}`

    return {
        title,
        slug: slugify(title),
        excerpt,
        bannerImage,
        markdown,
    }
}

module.exports = {
    generateMarkdownPost,
    getRandomUnsplashImage,
}