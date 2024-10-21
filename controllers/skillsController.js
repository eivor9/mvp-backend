// controllers/skillsController.js

// DEPENDENCIES
const express = require('express');
const skills = express.Router();

//QUERIES
const {
    getAllSkills, 
    getSkill
} = require('../queries/skills.js');

// INDEX - get all skills
skills.get("/", async (req, res) => {

    try {

        const allSkills = await getAllSkills();
        if(allSkills.length > 0) {
            res.status(200).json(allSkills);
        } else {
            res.status(500).json({ error: "server error"});
        }

    } catch (error) {
        res.status(500).json({ error: "server error"})
    }
});

// SHOW - get a single skill by id
skills.get("/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const skill = await getSkill(id);
        if(skill) {
            res.json(skill);
        } else {
            res.status(404).json({ error: "Skill not found"});
        }

    } catch(error) {
        res.status(500).json({ error: "server error"})
    }
});

module.exports = skills;
