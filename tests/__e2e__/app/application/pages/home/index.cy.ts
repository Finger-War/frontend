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

  it('Should change word color to red if wrong word is provided', () => {
    cy.visit('/');

    cy.get('[data-test="play-button"]').click();
    cy.get('[data-test="game-input"]').type(`any_wrong_wrong`).type(' ');
    cy.get('[data-test="game-words"]')
      .first()
      .should('have.class', 'text-red-600');
  });

  it('Should change word color to green if correct word is provided', () => {
    cy.visit('/');

    cy.get('[data-test="play-button"]').click();
    cy.get('[data-test="game-words"]').then(($words) => {
      const word = $words[0].textContent;
      cy.get('[data-test="game-input"]').type(`${word}`).type(' ');
    });
    cy.get('[data-test="game-words"]')
      .first()
      .should('have.class', 'text-green-600');
  });
});
