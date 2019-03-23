const welcome = () => {
  return `<!DOCTYPE html><html lang="en" style="margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;
  line-height:1.4;"> <head> <title>Welcome</title> </head> <body style="margin:0;padding:0;font-family:Helvetica,
  Arial,sans-serif;line-height:1.4;"> <table style="background-color:#eee;empty-cells:hide;margin:0 auto;padding:0;
  width:600px;"> <tr> <td style="margin:0 auto;background-color:#999592;box-sizing:border-box;color:#fff;
  letter-spacing:0.5px;padding:15px 25px;text-align:center;text-transform:uppercase;font-family:Helvetica,
  sans-serif;" > <h1>Welcome to Bookuet</h1> </td></tr><tr> <td style="margin:0 auto;background-color:#999592;
  height:400px;font-family:Helvetica,sans-serif;"> <a href="/"><img class="pic" style="height:100%;" 
  src="https://picsum.photos/600/400?image=1073"/></a> </td></tr><tr> <td style="margin:0 auto;background-color:#999592;font-family:Helvetica,
  sans-serif;"> <p style="box-sizing:border-box;color: #fff;letter-spacing:0.5px;padding:15px 25px;text-align:
  center;text-transform:uppercase;font-size: 10px;" > Copyright &copy; ${new Date().getFullYear()}. All Rights Resereved by Bookuet Inc. </p></td></tr></table> </body></html>`;
};

const purchase = data => {
  const renderItems = () => {
    let template = '';

    data.products.forEach(item => {
      template += `<tr><td style=" border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.title}</td>
      <td style=" border: 1px solid #dddddd; text-align: left; padding: 8px;">$ ${item.price}</td><td style=" 
      border: 1px solid #dddddd; text-align: left; padding: 8px;">${
        item.quantity
      }</td><td style=" border: 1px solid #dddddd; 
      text-align: left; padding: 8px;">$ ${(item.quantity * item.price).toFixed(2)}</td></tr>`;
    });

    return template;
  };

  return `<!DOCTYPE html><html style="margin: 0; padding: 0;"> <body style="margin: 0; padding: 0;"> 
  <table style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;"> 
  <tr> <td style="background-color: #999592; margin: 0 auto;"> <h1 style="box-sizing: border-box; color: white;
  font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; 
  padding: 15px 25px; text-align: center; text-transform: uppercase;" > Thanks for Shopping </h1> </td></tr>
  <tr> <td style="margin: 0 auto;"> <h2 style="box-sizing: border-box; color: #000000; font-family: Helvetica,
  Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center;
  text-transform: uppercase;" > Your purchase information </h2><div style="font-family: Helvetica, Arial, 
  sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px ; text-transform: uppercase;">
  <table style=" font-family: arial, sans-serif; border-collapse: collapse; background: #fff; width: 100%;">
  <tr style=" border: 1px solid #dddddd; background: #ccc; text-align: left; padding: 8px;"><th style="border: 1px
  solid #dddddd; text-align: left; padding: 8px;">Book Title</th><th style=" border: 1px solid #dddddd; 
  text-align: left; padding: 8px;">Price</th> <th style=" border: 1px solid #dddddd; text-align: left; 
  padding: 8px;">Quantity</th> <th style=" border: 1px solid #dddddd; text-align: left; padding: 8px;">Total Price
  </th></tr>${renderItems()}</table><p><strong>Order ID:</strong> ${data.products[0].porder}</p></div></td></tr><tr> 
  <td style="background-color: #999592; margin: 0 auto;"> <p style="box-sizing: border-box; color: white;
  font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px;
  text-align: center; text-transform: uppercase;font-size:10px" > Copyright &copy; ${new Date().getFullYear()}. All Rights Resereved by Bookuet Inc. </p></td></tr></table> 
  </body></html>`;
};

module.exports = { welcome, purchase };
