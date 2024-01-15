describe('Read Package test', () => {
  it('The list of package request is succeed.', () => {
    
    cy.visit('http://localhost:3000'); 
    cy.window().its('getPackageList').invoke('getPackageList');

    cy.intercept('POST', `http://localhost:8080/getJoinedData`).as('getPackageList');
    cy.wait('@getPackageList').its('response.statusCode').should('eq', 200);
  });
});

describe('Insert Package test', () => {
    it('The new Package insert is succeed.', () => {
   
      cy.visit('http://localhost:3000'); 
      cy.window().its('insertData').invoke('insertData');
  
 
      cy.intercept('POST', `${process.env.REACT_APP_SERVER_URL}/addItem`).as('insertData');
      cy.wait('@insertData').then((interception) => {
        
        expect(interception.response.statusCode).to.equal(200);
  
       
        expect(interception.response.body).to.have.property('message').eq('Success insert!');
        expect(interception.response.body).to.have.property('result');
  
        cy.get('.package-item').should('have.length.greaterThan', 0);
      });
  
    });
  });
  

  describe('Delete Package test', () => {
    it('Package remove from the list is succeed.', () => {

      cy.window().its('insertData').invoke('insertData');
      
      cy.window().its('getPackageList').invoke('getPackageList');

      cy.get('.package-item').first().as('toBeDeletedPackage');
  
      cy.get('@toBeDeletedPackage').invoke('showDeleteDialog');
      cy.get('[data-cy=delete-button]').click();
  
      cy.intercept('POST', `${process.env.REACT_APP_SERVER_URL}/deleteItems`).as('deletePackage');
      
    
      cy.wait('@deletePackage').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.have.property('message').eq('Success delete!');
      });
  
      cy.get('@toBeDeletedPackage').should('not.exist');
    });
  });
  