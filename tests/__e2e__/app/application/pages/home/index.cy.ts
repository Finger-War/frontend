describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should renders home correctly', () => {
    cy.contains('Start Playing').should('be.visible');
    cy.contains('Play').should('be.visible');
  });

  it('Should render loading when words generator is fetching', () => {
    cy.contains('Loading').should('be.visible');
  });

  it('Should renders timer and game after start playing', () => {
    cy.get('[data-test="play-button"]').click();
    cy.get('[data-test="timer"]').should('be.visible');
    cy.get('[data-test="game"]').should('be.visible');
  });

  it('Should change word color to red if wrong word is provided', () => {
    cy.get('[data-test="play-button"]').click();
    cy.get('[data-test="game-input"]').type(`any_wrong_wrong`).type(' ');
    cy.get('[data-test="game-words"]')
      .first()
      .should('have.class', 'text-red-600');
  });

  it('Should change word color to green if correct word is provided', () => {
    cy.get('[data-test="play-button"]').click();
    cy.get('[data-test="game-words"]').then(($words) => {
      const word = $words[0].textContent;
      cy.get('[data-test="game-input"]').type(`${word}`).type(' ');
    });
    cy.get('[data-test="game-words"]')
      .first()
      .should('have.class', 'text-green-600');
  });

  it('Should show wpm when the match is over', () => {
    cy.get('[data-test="play-button"]').click();
    cy.get('[data-test="timer"]').should('exist');
    cy.get('[data-test="game-words"]').each(($word) => {
      const word = $word.text();
      cy.get('[data-test="game-input"]').type(`${word} `);
    });

    cy.get('[data-test="wpm"]').should('exist');
  });
});
