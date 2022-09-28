const {mockRequest,mockedResponse} = require("../interceptor");
const authController = require("../../../controllers/auth.controller");
const newUser = require('../mockData/newUser.json');
const Models = require("../../../models");
const User = Models.user;
const Role = Models.role;

/**
 * Some kind of prep work before the tests are executed.
 */
let req,res ;
beforeEach(()=>{
    //Whatever that i write here, will be executed before every describe tests
    req = mockRequest();
    res = mockedResponse();
})


/**
 * Test the signup method
 * 
 *      1. Successful sign up 
 *          a. When we  provided the roles to a user
 *          b. When we don't provided the roles to a user
 *      2. SignUp failed
 * 
 * We are doing 3 tests, under one broad topic which is signUP
 */

describe("Testing SignUp method of authController" ,()=>{
    // Successful sign up ,When we provided the roles to a user
    it("Successful sign up,when we provide the roles to a user", async ()=>{
        //I need to provide some body to the req
        req.body = newUser
        /**
         * Mock the user and role model
         */

        const resFromCreate = {
            setRoles : async ()=> Promise.resolve()
        }
        const spyOnCreate = jest.spyOn(User,'create').mockImplementation(()=> Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role,'findAll').mockImplementation(()=> Promise.resolve());

        //Actual execution of the method
        await authController.signup(req,res); // I need to wait for the signUp method to complete

        //Validating the test passed successful or not
        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();

        /**
         * first 2 are mocked bro and second,3  is actual we check whether actual is called even after mocking or not
         */
        await expect(User.create).toHaveBeenCalled();
        await expect(Role.findAll).toHaveBeenCalled();


        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({message : "User successfully registered"})
    })

    /** 
    // Successful sign up ,When we don't provided the roles to a user
    it("Successful sign up,when we don't provide the roles to a user",()=>{
        
    })

    // SignUp failed
    it("SignUp failed",()=>{
        
    })
    */
})




/**
 * Test the sign in
 */