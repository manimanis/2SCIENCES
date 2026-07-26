hljs.registerLanguage('algorithm', (hljs) => {
  return {
    name: 'algorithm',
    aliases: ['alg', 'pseudo', 'pseudocode'],
    case_insensitive: true,
    keywords: {
      $pattern: /[a-zA-Z_À-ÿ']+/ ,
      keyword: [
        'algorithme', 'retourner', 'programme', 'fonction', 'procédure', 'procedure',
        'début', 'debut', 'ecrire', 'écrire', 'afficher', 'lire', 'saisir',
        'si', 'alors', 'sinon', 'fin', 'finsi', 'tantque', 'faire', 'répéter', 'repeter',
        'jusqu\'à', 'jusqua', 'mod', 'div', 'pour', 'de', 'à', 'pas',
        'non', 'et', 'ou', 'ouex', 'selon', 'cas', 'finselon', 'match', 'case'
      ],
      literal: ['faux', 'vrai', 'nul', 'true', 'false'],
      type: ['entier', 'réel', 'reel', 'chaine', 'chaîne', 'caractère', 'caractere', 'booléen', 'booleen', 'tableau']
    },
    contains: [
      {
        scope: 'string',
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        scope: 'string',
        begin: "'",
        end: "'",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        scope: 'operator',
        begin: /←|->|<-|<=|>=|!=|=|≠|\+|-|\*|\//
      }
    ]
  };
});
