import { GreeterServiceApi } from './greeter';

export * from './greeter';

function hello() {
  const greeter = new GreeterServiceApi(undefined, 'http://localhost:8081');
  greeter.greeterServiceSayHello({
    name: 'World',
  }).then((response) => {
    console.log(response.data);
  }
  ).catch((error) => {
    console.error('Error:', error);
  }
  );
}
(async () => {
  hello();
}
)();