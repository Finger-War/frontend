describe('Home Page', () => {
  it('Should renders home correctly', () => {
    cy.visit('/');
    cy.contains('Start Playing');
    cy.contains('Play');
  });

  it('Should render loading when words generator is fetching', () => {
    cy.visit('/');
    cy.contains('Loading');
  });

  it('Should renders timer and game after start playing', () => {
    cy.visit('/');

    cy.get('[data-test="play-button"]').click();

    cy.get('[data-test="timer"]').should('be.visible');
    cy.get('[data-test="game"]').should('be.visible');
  });
});
