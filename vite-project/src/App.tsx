import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession, signInWithRedirect } from "aws-amplify/auth";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetchAuthSession().then((session) => {
      console.log(session.tokens?.accessToken.toString());
    });
  }, []);

  const signInWithOIDC = async () => {
    try {
      const federatedSignInResponse = await signInWithRedirect({
        provider: {
          custom: "AZURE-OIDC",
        },
      });
      await fetchAuthSession().then((session) => {
        console.log(session.tokens?.accessToken.toString());
      });
      console.log("Federated Sign In Response:", federatedSignInResponse);
    } catch (error) {
      console.error("Error signing in with OIDC provider:", error);
    }
  };
  return (
    <>
      <button onClick={signInWithOIDC}>Sign in with OIDC</button>
      <Authenticator signInWithRedirect={signInWithOIDC}>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </>
  );
}

export default App;
