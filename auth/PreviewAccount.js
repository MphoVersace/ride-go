import { createContext, useContext, useRef, useState } from 'react';
import { CryptoDigestAlgorithm, digestStringAsync, randomUUID } from 'expo-crypto';

const sampleProfiles = {
  rider: { role: 'rider', firstName: 'Mpho', lastName: 'Mtlomelo', phone: '+27712345678', email: 'mpho@example.com' },
  driver: { role: 'driver', firstName: 'Thabo', lastName: 'Mokoena', phone: '+27712345678', email: 'thabo.mokoena@example.com' },
};

const PreviewContext = createContext(null);
const hash = (salt, password) => digestStringAsync(CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);

export function PreviewAccountProvider({ children }) {
  const accounts = useRef(new Map());
  const [profile, setProfile] = useState(null);

  async function register(role, details, password) {
    if (accounts.current.has(details.email)) return false;
    const salt = randomUUID();
    const verifier = await hash(salt, password);
    if (accounts.current.has(details.email)) return false;
    const accountProfile = { ...details, role, driverSetupComplete: false };
    accounts.current.set(details.email, { profile: accountProfile, salt, verifier });
    setProfile(accountProfile);
    return true;
  }

  async function login(email, password) {
    const account = accounts.current.get(email);
    if (!account || await hash(account.salt, password) !== account.verifier) return null;
    setProfile(account.profile);
    return account.profile;
  }

  function updateProfile(changes) {
    if (!profile) return;
    const updated = { ...profile, ...changes };
    const account = profile.sample ? null : accounts.current.get(profile.email);
    if (account) {
      if (updated.email !== profile.email && accounts.current.has(updated.email)) return false;
      accounts.current.delete(profile.email);
      accounts.current.set(updated.email, { ...account, profile: updated });
    }
    setProfile(updated);
    return true;
  }

  function startPreview(role) {
    setProfile({ ...sampleProfiles[role], sample: true });
  }

  function signOut() {
    setProfile(null);
  }

  return (
    <PreviewContext.Provider value={{ profile, register, login, updateProfile, startPreview, signOut }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreviewAccount() {
  return useContext(PreviewContext);
}
