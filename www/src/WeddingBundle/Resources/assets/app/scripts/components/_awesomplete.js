document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let awesompleteHome = document.getElementById('searchForm-input-location-autocomplete'),
        locationList = [
            '<span class="country">Mauritius</span>',
            '<span class="district">Black River</span>',
            'Albion',
            'Anna',
            'Bambous',
            'Barachois',
            'Beaux Songes',
            'Belle Isle',
            'Black River Village',
            'Cachette',
            'Camp Malgache',
            'Canot',
            'Cascavelle',
            'Casela',
            'Chamarel',
            'Clarence',
            'Clarens',
            'Coteau Raffin',
            'Eau Bonne',
            'Embrasure',
            'Flic En Flac',
            'Grand Riviere Noire',
            'Grande Case Noyale',
            'Gros Cailloux',
            'Ka Hine',
            'La Crete',
            'La Gaulette',
            'La Mecque',
            'La Mivoie',
            'Labonter',
            'Lavilleon',
            'Le Morne',
            'Les Salines',
            'Magenta',
            'Mare Samson',
            'Medine Anna',
            'Mon Repos',
            'Mon Vallon',
            'Palmyre',
            'Petite Case Noyale',
            'Petite Riviere',
            'Petite Riviere Noire',
            'Petite Verger',
            'Pointe Aux Sables',
            'Riviere Noire',
            'Suase',
            'Tamarin',
            'Trois Cavernes',
            'Trou Chenilles',
            'Truble',
            'Trublet',
            'Wahlalah',
            'Wolmar',
            'Yemen',
            '<span class="district">Grand Port</span>',
            'Anse Jonchee',
            'Astrea',
            'Astroea',
            'Balisson',
            'Bambous Virieux',
            'Bananes',
            'Beau Fond',
            'Beau Site',
            'Beau Vallon',
            'Bemanique',
            'Bestel',
            'Bois d’Oiseaux',
            'Bois Des Amourettes',
            'Bouchon',
            'Camp Accacia',
            'Camp Carol',
            'Camp Cassia',
            'Camp Jardin',
            'Cent Gaulettes',
            'Cluny',
            'Dalais',
            'Deux Bras',
            'Eau Bleue',
            'Ferney',
            'Grand Bel Air',
            'Grand Sable',
            'Gros Billot',
            'Gros Bois',
            'Joli Bois',
            'L’Escalier',
            'La Barraque',
            'La Rampe',
            'La Rampe - Le Moirt',
            'La Rosa',
            'La Sourdine',
            'Le Bouchon',
            'Le Chaland',
            'Le Val',
            'Le Vallon',
            'Les Marres',
            'Ligne Barrin',
            'Mahebourg',
            'Mare Chicose',
            'Mare D\'albert',
            'Mare Tabac',
            'Marie Jeanie',
            'Metheline',
            'Mont Desert - Mont Tresor',
            'New Grove',
            'New Grove Station',
            'Nouvelle France',
            'Old Grand Port',
            'Pavillon Du Grand Port',
            'Petit Bel Air',
            'Petit Sable',
            'Plaine Magnien',
            'Plein Bois',
            'Pointe Aux Roches',
            'Pointe d’Esny',
            'Pointe Jerome',
            'Pont Colville',
            'Rama',
            'Riche En Eau',
            'Riviere Des Creoles',
            'Rose Belle',
            'Ruisseau Copeaux',
            'Saint Hilaire',
            'Saint Hubert',
            'Sainte Madeleine',
            'Sainte Philomene',
            'Savinia',
            'Souffleur',
            'Trois Boutiques',
            'Union Park',
            'Union Vale',
            'Vieux Grand Port',
            'Ville Noire',
            'Virginia',
            '<span class="district">Flacq</span>',
            'Medine',
            'Argy',
            'Baie Manioc',
            'Bel Etang',
            'Belle Mare',
            'Belle Rive',
            'Belle Rose - Bel Air',
            'Belle Vue Allendy',
            'Bois d’Oiseau',
            'Bon Accueil',
            'Bon Manioc',
            'Bonne Mere',
            'Bramsthan',
            'Bras d’Eau',
            'Brisee Verdiere',
            'Camp Bonnemere',
            'Camp Bouillon',
            'Camp De Masque',
            'Camp De Masque Pave',
            'Camp Garreau',
            'Camp Ithier',
            'Camp Marcelin',
            'Camp Poorun',
            'Camp Sonah',
            'Central Flacq',
            'Clavet',
            'Clemencia',
            'Constance',
            'Coquinbourg',
            'Deep River',
            'Deux Freres',
            'Ecroignard',
            'Ernest Florent',
            'Etoile',
            'Grand Dans Fond',
            'Grand River',
            'Grand River South East',
            'Grande Retraite',
            'Haut De Flacq',
            'Isidore Rose',
            'Julien',
            'La Caroline',
            'La Commune',
            'La Coterie',
            'La Gaiete',
            'La Lucie',
            'La Marre',
            'La Nourrice',
            'Lalmatie',
            'Laventure',
            'Lesur',
            'L\'unite',
            'Mare Carree',
            'Mare d’Australia',
            'Mare Jacot',
            'Mare Jocquot',
            'Mare La Chaux',
            'Mare Saint-amand',
            'Marie Jeanne',
            'Olivia',
            'Palmar',
            'Petit Bois',
            'Petite Cabane',
            'Pointe Aux Feuilles',
            'Pont Blanc',
            'Poste De Flacq',
            'Poste La Fayette',
            'Profonde River',
            'Quatre Cocos',
            'Quatre Soeurs',
            'Queen Victoria',
            'Rich Fund',
            'River Profonde',
            'Riviere Seche',
            'Saint Julien Village',
            'Saint Remy',
            'Sebastopol',
            'St Remy',
            'Trois Ilots',
            'Trou d’Eau douce',
            'Union Flacq',
            '<span class="district">Moka</span>',
            'Petit Verger',
            'Providence',
            'Alma',
            'Bar Le Duc',
            'Bety',
            'Bois Pougnet',
            'Bonne Veine',
            'Camp Auguste',
            'Camp Thorel',
            'Campbell',
            'Chantenay',
            'Circonstance',
            'Cote d’Or',
            'Dagotiere',
            'Dubreuil',
            'Ebene',
            'Esperance',
            'Helvetia',
            'Herve',
            'L Agrement',
            'L Assurance',
            'L Avenir',
            'La Dagotiere',
            'La Laura',
            'La Russie',
            'L\'avenir',
            'Le Bocage',
            'Les Guibies',
            'Melrose',
            'Minissy',
            'Moka Village',
            'Mont Desert - Alma',
            'Mont Fleury',
            'Montagne Ory',
            'Montebello',
            'Mount Ory',
            'Pailles',
            'Piton Du Milieu',
            'Quartier Militaire',
            'Reduit',
            'Ripailles',
            'Riviere Baptiste',
            'Riviere Du Bois',
            'Roselyn Cottage',
            'Saint Pierre',
            'Salazie',
            'Soreze',
            'Telfair',
            'Valetta',
            'Verdun',
            'Vuillemin',
            '<span class="district">Pamplemousses</span>',
            'Camp Creoles',
            'Belvedere',
            'Arsenal',
            'Baillache',
            'Balaclava',
            'Bassin Louloup',
            'Beau Plan',
            'Belle Vue Harel',
            'Belle Vue Pilot',
            'Bois Mangue',
            'Bois Marchand',
            'Bois Pignolet',
            'Bois Rouge',
            'Bon Air',
            'Calebasses',
            'Camp Bestel',
            'Camp Des Embrevades',
            'Caroline',
            'Congomah',
            'D’Epinay',
            'Fond Du Sac',
            'Grande Pointe Aux Piments',
            'Grande Rosalie',
            'Ilot',
            'Khoyratty',
            'L’Espoir',
            'La Bergerie',
            'La Cocoterie',
            'Le Goulet',
            'Le Hochet',
            'Le Plessis',
            'Leonbourg',
            'Les Mariannes',
            'Long Mountain',
            'Madame Cayeux',
            'Maison Blanche',
            'Melotte',
            'Mont Choisy',
            'Mont Gout',
            'Mont Longue',
            'Mont Rocher',
            'Morcellemont Saint Andre',
            'Notre Dame',
            'Notre Dame Station',
            'Pamplemousses Village',
            'Pelissis',
            'Petit Gamin',
            'Petite Julie',
            'Petite Rosalie',
            'Plaine Des Papayes',
            'Pointe Aux Cannoniers',
            'Pont Praslin',
            'Richeterre',
            'Robinson',
            'Roche Bois',
            'Rouge Terre',
            'Ruisseau Rose',
            'Saint Cloud',
            'Saint-andre',
            'Saint-joseph',
            'Solitude',
            'The Mount',
            'Tombeau Bay',
            'Trio',
            'Triolet',
            'Trou Aux Biches',
            'Valton',
            'Ville Bague',
            'Ville Valio',
            '<span class="district">Plaine Wilhems</span>',
            'Pellegrin',
            'Plaisance',
            'Bagatelle',
            'Midlands',
            'Belle Rose - Quatre Bornes',
            'Barkly',
            'Beau Bassin',
            'Belle Etoile',
            'Belle Terre',
            'Bonne Terre',
            'Camp Caval',
            'Camp Fouquereaux',
            'Camp La Savanne',
            'Camp Mapou',
            'Camp Roches',
            'Candos',
            'Carreau La Liane',
            'Castel',
            'Chebel',
            'Cinq Arpents',
            'Curepipe',
            'Eau Coulee',
            'Eighteenth Mile Village',
            'Engrais Cathan',
            'Engrais Martial',
            'Floreal',
            'Forest Side',
            'Glen Park',
            'Henrietta',
            'Highlands',
            'Holyrood',
            'La Caverne',
            'La Croisee',
            'La Louise',
            'La Marie',
            'La Source',
            'Le Petrin',
            'Les Casernes',
            'Malherbes',
            'Mesnil',
            'Montagne Blanche',
            'Petit Camp',
            'Phoenix',
            'Plaine Noel',
            'Plaine Sophie',
            'Quatre Bornes',
            'Quinze Cantons',
            'Reunion',
            'River Side',
            'Roches Brunes',
            'Rose Hill',
            'Saint Jean',
            'Saint Paul',
            'Seizieme Mille',
            'Solferino',
            'Stanley',
            'Trianon',
            'Vacoas',
            'Ville D Apray',
            'Vuillemain',
            'Wooten',
            '<span class="district">Port Louis</span>',
            'Abercrombie',
            'Bain Des Dames',
            'Bell Village',
            'Bell Village Station',
            'Camp Yoloff',
            'Carreau Lalo',
            'Cassis',
            'Caudan Waterfront Port Louis',
            'Champ De Mars',
            'Cite La Cure',
            'Cite Valijee',
            'Downtown Port Louis',
            'Grand River North West',
            'Lagesse',
            'Mer Rouge',
            'Mon Loisir',
            'Plaine Verte',
            'Port Louis Waterfront',
            'Sainte Croix',
            'Tranquebar',
            'Vallee Des Pretres',
            'Vallee Pitot',
            '<span class="district">Riviere du Rempart</span>',
            'Belle Vue',
            'Hermitage',
            'Petit Paquet',
            'Amitie',
            'Saint Antoine',
            'Amaury',
            'Antoinette',
            'Barlow',
            'Beau Mangue',
            'Beau Manguier',
            'Belle Vue Maurel',
            'Belmont',
            'Bon Espoir',
            'Calodyne',
            'Cap Malheureux',
            'Cottage',
            'Esperance Trebuchet',
            'Forbach',
            'Gaboola',
            'Germain',
            'Gokoola',
            'Goodlands',
            'Grand Bay',
            'Grand Gaube',
            'Haute Rive',
            'L’Amitie',
            'La Clemence',
            'La Lucia',
            'La Morue',
            'Labourdonnais',
            'Le Ravin',
            'L\'esperance',
            'Madame Azor',
            'Mamzelle Jeanne',
            'Mapou',
            'Melville',
            'Mon Piton',
            'Mon Songe',
            'Mont Piton',
            'Pavillon',
            'Pereybere',
            'Petit Raffray',
            'Piton',
            'Plaines Des Roches',
            'Poudre d’Or',
            'Poudre d’Or hamlet',
            'Poudre d’Or village',
            'Ravin',
            'Reunion Maurel',
            'Riviere Du Rempart Village',
            'Roche Terre',
            'Roches Noires',
            'Saint François',
            'Schoenfeld',
            'The Vale',
            'Twelve Mile Post',
            'Union Maurel',
            '<span class="district">Savanne</span>',
            'Saint Martin',
            'Beau Champ - Bel Ombre',
            'Beau Bois',
            'Choisy',
            'Valentina',
            'Baie Du Cap',
            'Batimarais',
            'Baty Mare',
            'Bel Air Village',
            'Bel Ombre',
            'Benares',
            'Bois Cheri',
            'Bois Sec',
            'Bon Courage',
            'Britannia',
            'Camp Berthaud',
            'Camp Diable',
            'Chamouny',
            'Chemin Grenier',
            'Fontenelle',
            'Frederica',
            'Grand Bois',
            'La Flora',
            'Le Marres',
            'Lucon',
            'Mont Blanc',
            'Pomponnette',
            'Port Souillac',
            'Riambel',
            'Riche Bois',
            'Riviere Des Anguilles',
            'Riviere Dragon',
            'Riviere Du Poste',
            'Ruisseau Creole',
            'Saint Aubin',
            'Saint Avold',
            'Saint Felix',
            'Sainte-marie',
            'Savannah',
            'Senneville',
            'Souillac',
            'Surinam',
            'Terracine',
            'Tyack',
            'Union Saint Aubin',
            'Valruche',
            '<span class="country">Rodrigues</span>',
            '<span class="district">Port Mathurin</span>',
            'Creve Coeur',
            'Anse Aux Anglais',
            'Baie Lascars',
            'Camp Du Roi',
            'Caverne Provert',
            'Jeantac',
            'Point Monnier',
            'Port Mathurin Harbor',
            'Terre Rouge',
            '<span class="district">Lataniers - Mont Lubin</span>',
            'Citronelle',
            'Grande Montagne',
            'Lataniers',
            'Mont Lubin',
            'Orange',
            'Palissade Ternel',
            'Sygangue',
            'Vangar',
            '<span class="district">Petit Gabriel</span>',
            'Petit Gabriel Village',
            'Saint Gabriel',
            '<span class="district">Riviere Cocos</span>',
            'Anse Baleine',
            'Anse Raffin',
            'Citron Donis',
            'Eau Vannee',
            'Riviere Cocos Village',
            '<span class="district">Mangues - Quatre Vents</span>',
            'Mangue',
            'Marechal',
            'Quatre Vents',
            '<span class="district">Plaine Corail - La Fouche Corail</span>',
            'Cascade Jean Louis',
            'Cite Patate',
            'Michel Island',
            'Petite Butte',
            'Sir Gaetan Duval Airport',
            '<span class="district">Port Sud-est</span>',
            'Mourouk',
            'Pompee',
            'Port Sud-est Village',
            '<span class="district">Oyster Bay</span>',
            'Accacia',
            'Allee Tamarin',
            'Baie Aux Huitres',
            'Point L\'herbe',
            'Pointe La Gueule',
            '<span class="district">Roche Bon Dieu - Trefles</span>',
            'Brule',
            'Point Coton',
            'Riviere Banane',
            'Roche Bon Dieu',
            'Vainqueur',
            '<span class="district">Piments - Baie Topaze</span>',
            '	Baie Topaze',
            '<span class="district">La Ferme</span>',
            'Baie Du Nord',
            'La Ferme Village',
            '<span class="district">Coromandel - Graviers</span>',
            'Coromandel',
            'Nouvelle Decouverte',
            'Montagne Cabris',
            'Patate Théophile',
            'Petit Gravier',
            'Trois Soleils',
            '<span class="district">Baie Malgache</span>',
            '	Anse Goeland',
            'Baie Malgache Village',
            '<span class="district">Grand Baie - Montagne Goyave</span>',
            'Baladirou',
            'Grand Baie'
        ];

    if ($.fn.debug) {
        console.log('AwesomepleteJS');
        console.log(awesompleteHome);
    }

    if (typeof awesompleteHome !== typeof undefined && awesompleteHome !== null) {

        if ($.fn.debug) {
            console.log('Awesomplete elem present');
        }

        var comboplete = new Awesomplete('#searchForm-input-location-autocomplete', {
            minChars: 0,
            maxItems: 99999,
            sort: false,
            list: locationList
        });

        awesompleteHome.addEventListener('focus', () => {
            if ($.fn.debug) {
                console.log('Awesomplete elem focus triggered');
            }
            document.querySelector('.awesomplete .input-group-btn .dropdown-toggle').style.borderColor = '#5cb3fd';
            displayComboplete();
        });

        awesompleteHome.addEventListener('awesomplete-select', (event) => {

            if ($.fn.debug) {
                console.log(event);
                console.log(event.origin);
            }

            if (event.origin.classList.contains('country') || event.origin.classList.contains('district')) {
                event.preventDefault();
            }

        });

        awesompleteHome.addEventListener('awesomplete-open', (text) => {

            if ($.fn.debug) console.log((text.target.nextElementSibling.childNodes));

            (text.target.nextElementSibling.childNodes).forEach((liElem) => {

                // TODO Continue
                if (liElem.childNodes) {
                    // console.log(liElem);
                    // if (liElem.childNodes.classList.contains('country') || liElem.childNodes.classList.contains('district')) {
                    //   console.log(liElem);
                    // }
                }

            });


        });


        document.querySelector('.awesomplete .dropdown-toggle').addEventListener('click', () => {
            if ($.fn.debug) {
                console.log('Awesomplete dropdown click');
            }
            displayComboplete();
        });
    }

    function displayComboplete() {

        if ($.fn.debug) {
            console.log('Display Comboplete');
        }

        if (comboplete.ul.childNodes.length === 0) {
            comboplete.minChars = 0;
            comboplete.evaluate();
        } else if (comboplete.ul.hasAttribute('hidden')) {
            document.querySelector('.awesomplete .input-group-btn .dropdown-toggle').style.borderColor = '#5cb3fd';
            console.log(document.querySelector('.awesomplete .input-group-btn .dropdown-toggle'));
            comboplete.open();
        } else {
            document.querySelector('.awesomplete .input-group-btn .dropdown-toggle').style.borderColor = '#ccc';
            comboplete.close();
        }

    }

});