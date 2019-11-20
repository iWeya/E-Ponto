/**
 * Authorize user with SUAP's Token
 * 
 * @param {SuapClient} suapClient 
 */
function authorizeUser(suapClient) {
    $.ajax({
        url: EPONTO_API_AUTHORIZATION_URL,
        data: {
            'scope': suapClient.getToken().getScope(),
            'token': suapClient.getToken().getValue()
        },

        type: 'GET',

        success: () => window.location.reload()
    });
}


/**
 * Show authentication error message
 */
function printAuthenticationErrorMessage() {
    let $authorizationMessage = document.querySelector(
        '[data-role="authorization-message"]'
    );

    $authorizationMessage.classList.remove('is-hidden');
}


/**
 * Handle SUAP API authentication result
 * 
 * @param {SuapClient} suapClient
 * @param {HTMLButtonElement} $loginButton
 */
function handleSUAPApiAuthentication(suapClient, $loginButton) {
    if (suapClient.isAuthenticated()) {
        authorizeUser(suapClient);
    } else {
        printAuthenticationErrorMessage();
        $loginButton.classList.remove('is-loading');
    }
}


document.addEventListener('DOMContentLoaded', function (event) {
    let $loginButton = document.querySelector(
        '[data-role="suap-login-button"]'
    );

    let client = new SuapClient(SUAP_URL, CLIENT_ID, REDIRECT_URI);
    client.init();

    handleSUAPApiAuthentication(client, $loginButton);

    $loginButton.setAttribute('href', client.getLoginURL());
});
