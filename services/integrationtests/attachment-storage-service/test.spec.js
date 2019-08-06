/* eslint-disable no-console */
/* eslint-disable no-undef */
process.env.AUTH_TYPE = 'basic';
const request = require('request-promise').defaults({ simple: false, resolveWithFullResponse: true });

const importToken = require('../iam/test.spec.js');
Token = require('../iam/test.spec.js');

let tokenAdmin = null;
const invalidToken = "034957430985";
const testUuid = "67f718b9-0b36-40b8-89d6-1899ad86f97e";
const invalidTestUuid = "abc-def-geh";
let batchDeletionID = null;

describe('Attachment-Storage-Service', () => {
   jest.setTimeout(15000);
	
  
  test('--- CREATE A MESSAGE ---', async (done) => {
    tokenAdmin = importToken.token;

    const toBeUploaded = {
      "integrationtests": true,
      "test": "create message test"
    };
    const createMessage = {
		method: 'PUT',
		uri: `http://attachment-storage-service.openintegrationhub.com/objects/${testUuid}`,
		json: true,
		headers: {
			"Authorization" : " Bearer " + tokenAdmin, 
		},
		body: toBeUploaded		
    };		
		
    const response = await request(createMessage);

    expect(response.statusCode).toEqual(201);
	
    done();
  });
  
  test('--- GET MESSAGE BY ID ---', async (done) => {

		const getMessageByID = {
			method: 'GET',
			uri: `http://attachment-storage-service.openintegrationhub.com/objects/${testUuid}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + tokenAdmin, 
			}
		};
		const response = await request(getMessageByID);
		expect(response.statusCode).toEqual(200); 
	done();
	});
	
	test('--- DELETE A MESSAGE ---', async (done) => {
		const deleteMessageById = {
			method: 'DELETE',
			uri: `http://attachment-storage-service.openintegrationhub.com/objects/${testUuid}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + tokenAdmin, 
			}		
		};		
		const response = await request(deleteMessageById);
		expect(response.statusCode).toEqual(204);
	
	done();
	});
	
	test('--- CREATE REQUEST FOR MESSAGE BATCH DELETION ---', async (done) => { 	
		
		const toBeUploaded = {
			"conditions": [
				{
					"key": "integrationtests",
					"value": true
				}
			]
		};
		
		const batchDelete = {
			method: 'POST',
			uri: `http://attachment-storage-service.openintegrationhub.com/batch/delete`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + tokenAdmin, 
			},
			body: toBeUploaded
		};
		
		const response = await request(batchDelete);
		
		const getBatchDeletionId = async res => {
			let batchDelID = false;

			try {
				batchDelID = await Promise.resolve(res.body.id);
				console.log(`My response is the following ${test}`);

			}
			catch (error) {
				console.log(batchDelID);
				throw new Error(error);
			}
			return batchDelID; 
		};
		batchDeletionID = await getBatchDeletionId(response);

		expect(response.statusCode).toEqual(202);
			
	done();
	});
		
	test('--- GET BATCH DELETE REQUEST STATUS ---', async(done) => {   
		
		const batchDeleteStatus = {
			method: 'GET',
			uri: `http://attachment-storage-service.openintegrationhub.com/batch/delete/${batchDeletionID}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + tokenAdmin, 
			}
		};

		const response = await request(batchDeleteStatus);
		
		expect(response.statusCode).toEqual(200);	
		done();
	});
  
	test('--- CREATE A MESSAGE - INVALID TOKEN ---', async (done) => {
		tokenAdmin = importToken.token;

		const toBeUploaded = {
			"integrationtests": true,
			"test": "create message test"
		};
		const createMessage = {
			method: 'PUT',
			uri: `http://attachment-storage-service.openintegrationhub.com/objects/${testUuid}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + invalidToken, 
			},
			body: toBeUploaded		
		};		
			
		const response = await request(createMessage);

		expect(response.statusCode).toEqual(401);
		
		done();
	});
  
  test('--- GET MESSAGE BY ID - INVALID TOKEN ---', async (done) => {

		const getMessageByID = {
			method: 'GET',
			uri: `http://attachment-storage-service.openintegrationhub.com/objects/${testUuid}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + invalidToken, 
				}
		};
		const response = await request(getMessageByID);
		expect(response.statusCode).toEqual(401); 
		done();
	});
	
	test('--- DELETE A MESSAGE - INVALID TOKEN ---', async (done) => {
		const deleteMessageById = {
			method: 'DELETE',
			uri: `http://attachment-storage-service.openintegrationhub.com/objects/${testUuid}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + invalidToken, 
			}		
		};		
		const response = await request(deleteMessageById);
		expect(response.statusCode).toEqual(401);
	
	done();
	});
	
	test('--- CREATE REQUEST FOR MESSAGE BATCH DELETION - INVALID TOKEN ---', async (done) => { 	
		
		const toBeUploaded = {
			"conditions": [
				{
					"key": "integrationtests",
					"value": true
				}
			]
		};
		
		const batchDelete = {
			method: 'POST',
			uri: `http://attachment-storage-service.openintegrationhub.com/batch/delete`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + invalidToken, 
			},
			body: toBeUploaded
		};
		
		const response = await request(batchDelete);
		
		expect(response.statusCode).toEqual(401);
			
	done();
	});

	test('--- GET BATCH DELETE REQUEST STATUS - INVALID Token ---', async(done) => {   
		
		const batchDeleteStatus = {
			method: 'GET',
			uri: `http://attachment-storage-service.openintegrationhub.com/batch/delete/${batchDeletionID}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + invalidToken, 
			}
		};

		const response = await request(batchDeleteStatus);
		
		expect(response.statusCode).toEqual(401);	
		done();
	});

	test('--- CREATE A MESSAGE - INVALID ID ---', async (done) => {
		tokenAdmin = importToken.token;
	
		const toBeUploaded = {
			"integrationtests": true,
			"test": "create message test"
		};

		const createMessage = {
			method: 'PUT',
			uri: `http://attachment-storage-service.openintegrationhub.com/objects/${invalidTestUuid}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + tokenAdmin, 
			},
			body: toBeUploaded		
		};		
			
		const response = await request(createMessage);
	
		expect(response.statusCode).toEqual(404);
		
		done();
	});

	test('--- GET MESSAGE BY ID - INVALID ID ---', async (done) => {

		const getMessageByID = {
			method: 'GET',
			uri: `http://attachment-storage-service.openintegrationhub.com/objects/${invalidTestUuid}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + tokenAdmin, 
			}
		};
		const response = await request(getMessageByID);
		expect(response.statusCode).toEqual(404); 
		done();
	});
	
	test('--- DELETE A MESSAGE - INVALID ID ---', async (done) => {
		const deleteMessageById = {
			method: 'DELETE',
			uri: `http://attachment-storage-service.openintegrationhub.com/objects/${invalidTestUuid}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + tokenAdmin, 
			}		
		};		
		const response = await request(deleteMessageById);
		expect(response.statusCode).toEqual(404);
	
	done();
	});
		
	test('--- GET BATCH DELETE REQUEST STATUS - INVALID ID ---', async(done) => {   
		
		const batchDeleteStatus = {
			method: 'GET',
			uri: `http://attachment-storage-service.openintegrationhub.com/batch/delete/${invalidTestUuid}`,
			json: true,
			headers: {
				"Authorization" : " Bearer " + tokenAdmin, 
			}
		};

		const response = await request(batchDeleteStatus);
		
		expect(response.statusCode).toEqual(404);	
		done();
	});
});
