(async () => {
    const corkCity = await require('./index');

    console.log(corkCity.lookup("9781472258229")) // => 'Kindred, by Octavia E. Butler (1979)'
    corkCity.add("9781472258229")

    console.log(corkCity.lookup("9780441569595")) // => 'Neuromancer, by William Gibson (1984)'
    corkCity.add("9780441569595", 3)

    corkCity.borrow("9781472258229") // Borrow a copy of 'Kindred'
    corkCity.borrow("9780441569595") // Borrow a copy of 'Neuromancer'
    corkCity.borrow("9780441569595") // Borrow another copy of 'Neuromancer'
    corkCity.return("9780441569595") // Return a copy of 'Neuromancer'

    console.log(corkCity.stock());
// 9780143111597, Copies: 0, Available: 0
// 9781472258229, Copies: 1, Available: 0
// 9780441569595, Copies: 3, Available: 2
// 9781857231380, Copies: 0, Available: 0
// 9780553283686, Copies: 0, Available: 0
})();