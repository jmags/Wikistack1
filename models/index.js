const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');


const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
    }, {
        hooks: {
                beforeValidate: (page) => {
                page.slug = nowYouHaveTwoSlugs(page.title);
            }
        }
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


function nowYouHaveTwoSlugs (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    // TODO: To lowercase.
    // TODO: Split and join instead of regex.
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }

module.exports = { db, Page, User };  