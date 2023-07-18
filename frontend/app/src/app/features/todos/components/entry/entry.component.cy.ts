import { EntryComponent } from './entry.component';

describe(EntryComponent.name, () => {
  describe('Valid Entries', () => {
    beforeEach(() =>
      cy.mount(EntryComponent, {
        autoSpyOutputs: true,
      })
    );

    it('Emits the output on entry when the submit button is clicked', () => {
      cy.get('input').type('More Beer');
      cy.get('[data-testid="error-alert"]').should('not.exist');
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="error-alert"]').should('not.exist');
      cy.get('@onItemAddedSpy').should('have.been.calledOnceWithExactly', {
        description: 'More Beer',
      });
    });

    it('Emits the output on entry when the enter button is hit', () => {
      cy.get('[data-testid="error-alert"]').should('not.exist');
      cy.get('input').type('More Beer{enter}');
      cy.get('[data-testid="error-alert"]').should('not.exist');
      cy.get('@onItemAddedSpy').should('have.been.calledOnceWithExactly', {
        description: 'More Beer',
      });
    });
  });

  describe('Invalid Entries', () => {
    beforeEach(() => {
      cy.mount(EntryComponent, {
        autoSpyOutputs: true,
      });
    });

    it('Shows an error on empty entry when the submit button is clicked', () => {
      cy.get('input#description').clear();
      cy.get('[data-testid="error-alert"]').should('not.exist');
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="error-alert"]').should(
        'have.text',
        'A description is required and needs to be 100 characters or less.'
      );
      cy.get('@onItemAddedSpy').should('not.be.called');
    });

    it('Shows an error on empty entry when the enter button is pressed', () => {
      cy.get('[data-testid="error-alert"]').should('not.exist');
      cy.get('input#description').type('{enter}');
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="error-alert"]').should(
        'have.text',
        'A description is required and needs to be 100 characters or less.'
      );
      cy.get('@onItemAddedSpy').should('not.be.called');
    });
  });
});
