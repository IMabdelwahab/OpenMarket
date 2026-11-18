const requestCategories = [
  {
    name: 'Plomberie',
    icon: 'plumbing',
    artisans: '38 maâlems disponibles',
    services: [
      "Réparation de fuite d'eau",
      'Débouchage canalisations',
      'Installation chauffe-eau',
      'Remplacement robinetterie',
      'Autre problème de plomberie',
    ],
  },
  {
    name: 'Électricité',
    icon: 'bolt',
    artisans: '42 maâlems disponibles',
    services: [
      'Panne électrique',
      'Installation luminaire',
      'Mise aux normes',
      'Installation prise ou interrupteur',
      'Autre problème électrique',
    ],
  },
  {
    name: 'Peinture',
    icon: 'format_paint',
    artisans: '25 maâlems disponibles',
    services: [
      'Peinture intérieure',
      'Peinture extérieure',
      'Rénovation des murs',
      'Peinture plafond',
      'Autre travaux de peinture',
    ],
  },
  {
    name: 'Serrurerie',
    icon: 'key',
    artisans: '19 maâlems disponibles',
    services: [
      'Ouverture de porte',
      'Changement de serrure',
      'Réparation de serrure',
      'Installation de serrure',
      'Autre problème de serrurerie',
    ],
  },
]

const requestCities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir']
const timeSlots = [
  'Matinée (08h00 - 12h00)',
  'Après-midi (14h00 - 18h00)',
  'Soirée (18h00 - 20h00)',
]

export { requestCategories, requestCities, timeSlots }
