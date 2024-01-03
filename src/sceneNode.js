/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        var transformedModelMatrix = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());
        var transformedModelView = modelView;
        var transformedMvp = MatrixMult(mvp, transformedModelMatrix);
        var transformedNormals = getNormalMatrix(MatrixMult(normalMatrix, transformedModelMatrix));
        var transformedModel = transformedModelMatrix;

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }        

        for(var i = 0; i < this.children.length; i++) {
            var childrenNode = this.children[i];
            var transformedChildrenModelMatrix = MatrixMult(transformedModelMatrix, childrenNode.trs.getTransformationMatrix());
            var transformedModelView = modelView;
            var transformedChildrenMvp = MatrixMult(mvp, transformedChildrenModelMatrix);
            var transformedChildrenNormals = getNormalMatrix(MatrixMult(normalMatrix, transformedChildrenModelMatrix));
            var transformedChildrenModel = transformedModelMatrix;
            childrenNode.meshDrawer.draw(transformedChildrenMvp, transformedModelView, transformedChildrenNormals, transformedChildrenModel)
            for (var j = 0; j < childrenNode.children.length; j++) {
                var grandChildrenNode = childrenNode.children[j];
                var transformedGChildrenModelMatrix = MatrixMult(transformedChildrenModelMatrix, grandChildrenNode.trs.getTransformationMatrix());
                var transformedModelView = modelView;
                var transformedGChildrenMvp = MatrixMult(mvp, transformedGChildrenModelMatrix);
                var transformedGChildrenNormals = getNormalMatrix(MatrixMult(normalMatrix, transformedGChildrenModelMatrix));
                var transformedGChildrenModel = transformedGChildrenModelMatrix;
                grandChildrenNode.meshDrawer.draw(transformedGChildrenMvp, transformedModelView, transformedGChildrenNormals, transformedGChildrenModel)
            }
        }
    }
}