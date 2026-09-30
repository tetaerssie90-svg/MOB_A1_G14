

export const GROUP_NUMBER = '14'; 
export const LEADER_REGISTRATION_LAST4 = '6951'; 


export function getGroupCode(): string {
  const group = GROUP_NUMBER.padStart(2, '0').slice(-2);
  const leader = LEADER_REGISTRATION_LAST4.padStart(4, '0').slice(-4);
  return `MOB-G${group}-${leader}`;
}