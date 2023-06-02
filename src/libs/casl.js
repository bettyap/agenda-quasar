import { defineAbility } from '@casl/ability';

export default function createAbility (user = {}) {
  const ability = defineAbility((can) => {

    if(user.roles.includes('ROLE_ADMIN')) {
      can('manage', 'all');
    }
  })


  return ability
}