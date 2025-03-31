import { GreeterServiceApi } from './greeter';

export * from './greeter';

function hello() {
  const greeter = new GreeterServiceApi();
  greeter.greeterServiceSayHello({
    name: 'World',
  }).then((response) => {
    console.log(response);
  }
  ).catch((error) => {
    console.error('Error:', error);
  }
  );
}