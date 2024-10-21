// queries/categories.js

const db = require('../db/dbConfig.js');

const getAllSkills = async () => {
  try {
    const skills = await db.any("SELECT * FROM skills");
    return skills;
  } catch (error) {
    return error;
  }
};

const getSkill = async (id) => {
  try {
    const skill = await db.one("SELECT * FROM categories WHERE id=$1", [id]);
    return skill;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllSkills, getSkill };
