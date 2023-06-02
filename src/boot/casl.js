import { Can, abilitiesPlugin } from '@casl/vue';
import createAbility from 'src/libs/casl';

let usuario = localStorage.getItem("user")
usuario = JSON.parse(usuario)

const ability = createAbility(usuario)

export default ({ app }) => {
  app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true
  })

  app.component(Can.name, Can)

}
  
