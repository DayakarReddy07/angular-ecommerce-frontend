import { Component, Inject } from '@angular/core';
import myAppConfig from '../../config/my-app-config';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import { Tokens } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      // useInteractionCodeFlow: false,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes,
      },
    });
  }

  // ngOnInit(): void {
  //   this.oktaSignin.remove();
  //   this.oktaSignin.renderEl(
  //     {
  //       el: '#okta-sign-in-widget',
  //     },
  //     (response: any) => {
  //       if (response.status === 'SUCCESS') {
  //         this.oktaAuth.signInWithRedirect();
  //       }
  //     },
  //     (error: any) => {
  //       throw error;
  //     },
  //   );
  // }

//  ngOnInit(): void {
//   console.log('ngOnInit called');
//   this.oktaSignin.remove();
//   this.oktaSignin.renderEl(
//     { el: '#okta-sign-in-widget' },
//     (response: any) => {
//       console.log('Response:', response);
//       console.log('Status:', response.status);
//       if (response.status === 'SUCCESS') {
//         this.oktaAuth.signInWithRedirect({
//           sessionToken: response.session.token
//         });
//       }
//     },
//     (error: any) => {
//       console.log('Error:', error);
//     }
//   );
// }

ngOnInit(): void {
  this.oktaSignin.remove();

  this.oktaSignin.showSignInToGetTokens({
    el: '#okta-sign-in-widget'
  }).then((tokens: Tokens) => {

    this.oktaAuth.handleLoginRedirect(tokens);

  }).catch((err: any) => {
    console.log('Error:', err);
  });
}

}
