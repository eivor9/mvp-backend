const db = require("../db/dbConfig");

const getUsersCategoriesById = async (user_id) => {
    try {
        const userCategories = await db.any("SELECT * FROM userCategories WHERE user_id=$1", [user_id]);
        return userCategories;
    } catch (error) {
        console.error('Error fetching user categories:', error);
        return null;
    }
};

const getUserSubcategoriesById = async (user_id) => {
    try {
        const userSubcategories = await db.any("SELECT * FROM userSubcategories WHERE user_id=$1", [user_id]);
        return userSubcategories;
    } catch (error) {
        console.error('Error fetching user subcategories:', error);
        return null;
    }
};

// Filter for categories/subcategories where user is a mentor/mentee
const getCategoriesWhereUserIsMentor = (userCategories) => {
    return userCategories.filter(category => category.is_mentor === true);
};

const getCategoriesWhereUserIsMentee = (userCategories) => {
    return userCategories.filter(category => category.is_mentee === true);
};

const getSubcategoriesWhereUserIsMentor = (userSubcategories) => {
    return userSubcategories.filter(subcategory => subcategory.is_mentor === true);
};

const getSubcategoriesWhereUserIsMentee = (userSubcategories) => {
    return userSubcategories.filter(subcategory => subcategory.is_mentee === true);
};



// get all users 
const fetchAllUsers = async () => {
    try {
        const users = await db.any("SELECT * FROM users");
        console.log("all Users:", users)
        return users;
    } catch (error) {
        console.error('Error fetching all users:', error);
        return null;
    }
};

//filter users based on their role
// const filterUsersByRole = async (role) => {
//     const allUsers = await fetchAllUsers();

//     if (!allUsers) return null; 

//     if (role === 'mentor') {
//         return allUsers.filter(user => user.is_mentor === true);
//     } else if (role === 'mentee') {
//         return allUsers.filter(user => user.is_mentee === true);
//     } else {
//         return allUsers;
//     }
// };


// create a map of users, getting user's id, category, subcategory, and their roles in category/subcategory
const mapUserCategoriesAndSubcategories = async (users) => {
    const userArr = [];
    
    for(const user of users) {
        const userId = user.id;
        const userCategories = await getUsersCategoriesById(userId);
        const userSubcategories = await getUserSubcategoriesById(userId);
        const userMentorCategories = await getCategoriesWhereUserIsMentor(userCategories);
        const userMenteeCategories = await getCategoriesWhereUserIsMentee(userCategories);
        const userMentorSubcategories = await getSubcategoriesWhereUserIsMentor(userSubcategories);
        const userMenteeSubcategories = await getSubcategoriesWhereUserIsMentee(userSubcategories);

        const userObj = {
            id: userId,
            mentorCategories: userMentorCategories.map(cat => cat.category_id),
            menteeCategories: userMenteeCategories.map(cat => cat.category_id),
            mentorSubcategories: userMentorSubcategories.map(sub => sub.subcategory_id), 
            menteeSubcategories: userMenteeSubcategories.map(sub => sub.subcategory_id),
        };
        userArr.push(userObj);
        
    } 
    return userArr
}

// function to console.log userMap,
// const showUserCategoryMap = async () => {
//     try {
//         const userCategoriesAndSubcategories = await mapUserCategoriesAndSubcategories();
//         console.log('Mapped Users:', userCategoriesAndSubcategories);
//     } catch (error) {
//         console.error('Error mapping user categories and subcategories:', error);
//     }
// };

// getAllUsers()
// showUserCategoryMap();


// 2. find potential matches for a specific user
const findPotentialMatchesForUser = (userToMatch, allUsers) => {
    const potentialMentors = allUsers.filter(mentor => {
        if (mentor.id === userToMatch.id) return false; 

        const mentorInCategories = mentor.mentorCategories.some(cat => userToMatch.menteeCategories.includes(cat));
        const mentorInSubcategories = mentor.mentorSubcategories.some(sub => userToMatch.menteeSubcategories.includes(sub));

        return mentorInCategories || mentorInSubcategories;
    });

    const potentialMentees = allUsers.filter(mentee => {
        if (mentee.id === userToMatch.id) return false;

        const menteeInCategories = mentee.menteeCategories.some(cat => userToMatch.mentorCategories.includes(cat));
        const menteeInSubcategories = mentee.menteeSubcategories.some(sub => userToMatch.mentorSubcategories.includes(sub));

        return menteeInCategories || menteeInSubcategories;
    });

    return {
        userId: userToMatch.id,
        matchedMentors: potentialMentors.map(mentor => ({
            mentorId: mentor.id,
            sharedCategories: mentor.mentorCategories.filter(cat => userToMatch.menteeCategories.includes(cat)),
            sharedSubcategories: mentor.mentorSubcategories.filter(sub => userToMatch.menteeSubcategories.includes(sub)),
        })),
        matchedMentees: potentialMentees.map(mentee => ({
            menteeId: mentee.id,
            sharedCategories: mentee.menteeCategories.filter(cat => userToMatch.mentorCategories.includes(cat)),
            sharedSubcategories: mentee.menteeSubcategories.filter(sub => userToMatch.mentorSubcategories.includes(sub)),
        })),
    };
};

// generate user matches by user_id
const generateMatchesForUser = async (user_id) => {
    try {
        const users = await fetchAllUsers();  
        const userArr = await mapUserCategoriesAndSubcategories(users); 

        const userToMatch = userArr.find(user => user.id === user_id);

        if (userToMatch) {
            const matches = findPotentialMatchesForUser(userToMatch, userArr);
            console.log(matches)
            return matches;
        } else {
            return `User with ID ${user_id} not found.`;
        }

        

    } catch (error) {
        console.error('Error getting matches for user:', error);
        return null;
    }
};

// console.log(generateMatchesForUser(1))

module.exports = {
    fetchAllUsers,
    getUsersCategoriesById,
    getUserSubcategoriesById,
    getCategoriesWhereUserIsMentor,
    getCategoriesWhereUserIsMentee,
    getSubcategoriesWhereUserIsMentee,
    getSubcategoriesWhereUserIsMentor,
    mapUserCategoriesAndSubcategories,
    findPotentialMatchesForUser,
    generateMatchesForUser
};

