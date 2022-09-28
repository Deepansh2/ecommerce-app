
const { mockRequest, mockedResponse } = require('../interceptor');
const newCategory = require('../mockData/newCategory.json');
const Category = require('../../../models').category;
const categoryController = require('../../../controllers/category.controller');
const { category } = require('../../../models');




/**
 * I need to test the functionality of creating Category
 */




/**
 * Before the testing is done , we need to have the req and res objects
 * 
 * Normally req and res, will be passed by route layer, but here since there is no
 * routes,we need to create mock req and res.
 * 
 * 
 * Mocked req
 */
let req, res;
beforeEach(() => {

    req = mockRequest
    res = mockedResponse
})


describe("Testing creating category method", () => {

    beforeEach(()=>{
        //For creating the category, req should have a body
        req.body = newCategory
    })


    it("Test successful creation of a new category", async () => {


        //Mock and spy on Category create method
        const spy = jest.spyOn(Category, 'create').mockImplementation((newCategory) => Promise.resolve(newCategory))

        //Execute the create method

        await categoryController.create(req, res);

        //Validation

        //I will expect spy to be called
        expect(spy).toHaveBeenCalled();
        //I will expect Category create method to be called
        expect(Category.create).toHaveBeenCalledWith(newCategory);
        //res status should be set to 201
        expect(res.status).toHaveBeenCalledWith(201);

        // res send is sending the newCategory
        expect(res.send).toHaveBeenCalledWith(newCategory);


    });

    /**
     * Testing the failure scenario
     */
    it("Test failure during the creation of a new category", async () => {

        //Mock and spy
        const spy = jest.spyOn(Category, 'create').mockImplementation((newCategory) => Promise.reject(Error("Error while creating")));

        //Execute the method
        await categoryController.create(req, res);

        await expect(spy).toHaveBeenCalled();
        expect(Category.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal server error happened"
        })
    })
})

describe("Testing the findAll method", ()=>{

    it("Test the findAll method when no query params was passed",async()=>{

        //Mock the category.findAll method
        const spy = jest.spyOn(Category,'findAll').mockImplementation(()=>Promise.resolve(newCategory))

        //Invoke the method
        await categoryController.findAll(req,res);

        //Validations
        expect(spy).toHaveBeenCalled();
        expect(Category.findAll).toHaveBeenCalled();
        expect(re.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory)
    });

    it("Test the find all method with the query param",async ()=>{
        const queryParam = {
            where : {
                name : "Electronics"
            }
        }
        const spy = jest.spyOn(Category,'findAll').mockImplementation((queryParam)=>Promise.resolve(newCategory));

        req.query = {
            name : "Electronics"
        }

        //Execute the method
        await categoryController.findAll(req,res);

        //Validation 
        expect(spy).toHaveBeenCalled();
        expect(category.findAll).toHaveBeenCalledWith(queryParam);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory)


    })
})

describe("Testing update method", ()=>{

    it("Testing successful update", async()=>{

        req.body = newCategory;
        req.params = {
            id:1
        }
        //Category method has to be mocked

        const spyOnUpdate = jest.spyOn(Category,'update').mockImplementation(()=>Promise.resolve(newCategory));

        const spyOnFindByPk = jest.spyOn(Category,'findByPk').mockImplementation(()=> Promise.resolve(newCategory))

        await categoryController.updateCategory(req,res);
    

        //execute the update method
        expect(spyOnUpdate).toHaveBeenCalled();
        expect(spyOnFindByPk).toHaveBeenCalled()
        expect(categoryController.updateCategory).toHaveBeenCalledWith();
        
    })
})