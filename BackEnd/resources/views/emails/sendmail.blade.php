
<div style="display: block; padding: 0px; margin: 0px; width: 100%; background: #f2f2fd; font-size: 18px; font-weight: normal; font-family: 'Baloo 2', 'Open Sans', 'Roboto', 'Segoe UI', 'Helvetica Neue', Helvetica, Tahoma, Arial, monospace, sans-serif;">
    <table style="border-collapse: collapse; border-spacing: 0; border: 0px; width: 640px; max-width: 90%; margin: 100px auto; box-shadow: 0px 20px 48px rgba(0, 0, 0, 0.2); border-radius: 10px; overflow: hidden;">
        <tbody>
            <tr>
                <td colspan="10">
                    <div class="margin"></div>
                    <h2>Account Activation</h2>
                    <p>Hello, {{ $userName }}</p>
                    <p>Please click on the link below to activate your account</p>
                </td>
            </tr>
            <tr>
                <td colspan="10">
                    <a href="{{ $activationLink }}" class="button" target="_blank">Click here to create your account!!</a>
                </td>
            </tr>
            <tr>
                <td colspan="10">
                    <p>Thank you for joining our service.</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
