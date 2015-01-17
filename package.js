Package.describe({
  summary: 'Automatically generate routes for prototyping',
  version: '0.1.0',
  name: 'sacha:autorouter',
  git: 'https://github.com/sachag/autorouter.git'
});

Package.onUse(function (api) {

  api.use([
    'autopublish@1.0.2',
    'iron:router@1.0.7',
    'dburles:mongo-collection-instances@0.2.6'
  ]);

  api.add_files([
    'autorouter.js',
  ], ['client', 'server']);

});