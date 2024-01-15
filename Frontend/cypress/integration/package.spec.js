
describe('Package rögzítése', () => {
    it('Az új csomagtipus rögzítése sikeresen történik', () => {
   
      cy.visit('http://localhost:3000'); 
      cy.window().its('insertData').invoke('insertData');
  
 
      cy.intercept('POST', `${process.env.REACT_APP_SERVER_URL}/addItem`).as('insertData');
      cy.wait('@insertData').then((interception) => {
        
        expect(interception.response.statusCode).to.equal(200);
  
       
        expect(interception.response.body).to.have.property('message').eq('Sikeres rögzítés.');
        expect(interception.response.body).to.have.property('result');
  
        cy.get('.csomag-lista-item').should('have.length.greaterThan', 0);
      });
  
    });
  });
  
  describe('Package listázása', () => {
    it('A csomagtipus lekérése sikeresen történik', () => {
      
      cy.visit('http://localhost:3000'); 
      cy.window().its('getPackageList').invoke('getPackageList');
  

      cy.intercept('POST', `${process.env.REACT_APP_SERVER_URL}/getJoinedData`).as('getPackageList');
      cy.wait('@getPackageList').then((interception) => {
 
        expect(interception.response.statusCode).to.equal(200);

        expect(interception.response.body).to.have.property('length').greaterThan(0);
      });
    });
  });